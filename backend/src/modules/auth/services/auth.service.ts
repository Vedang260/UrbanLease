import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repositories/user.repository';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dtos/createUser.dto';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try{
      // Check if user exists
      const user = await this.userRepository.findUserByEmail(email);
      if(!user) {
        throw new NotFoundException('User Not Found');
      }

      // Check for correct password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
        throw new BadRequestException('Invalid Credentials');
      }
      return user;
    }catch(error){
      console.error('Error validating user:', error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<{ success: boolean; message: string; token?: string | null, user: any}> {
    try{
      const { email, password } = loginDto;

      // Validating the user
      const user = await this.validateUser(email, password);
      
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      
      const payload = { 
        id: user.userId, 
        username: user.fullName, 
        role: user.role 
      };
      
      return {
        success: true,
        message: 'User is logged in successfully',
        token: this.jwtService.sign(payload),
        user:{
          id: user.userId,
          username: user.fullName,
          email: user.email,
          role: user.role
        }
      };
    }catch(error){
      console.error('Error in Login: ', error.message);
      return{
        success: false,
        message: error.message,
        user: null
      }
    }
  }

  async register(createUserDto: CreateUserDto): Promise<{ success: boolean; message: string }> {
    try{
      // Check if user already Exists
      const existingUser = await this.userRepository.findUserByEmail(createUserDto.email);
      if(existingUser){
        throw new ConflictException('User already exists');
      }
      // Hash the password
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      // Create a new user
      await this.userRepository.createUser(createUserDto);
      
      return {
        success: true,
        message: 'User registered successfully'
      };
    }catch(error){
      console.error('Error in User Registration: ', error.message);
      return {
        success: false,
        message: 'Failed to register user'
      }
    }
  }
} 