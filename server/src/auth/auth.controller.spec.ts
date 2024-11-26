import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { BadRequestException } from '@nestjs/common';


describe('AuthController', () => {

    //Variables to hold the instance of suthControllerandauthservce
    let authController: AuthController;
    let authService: AuthService;

    //  this is work before each test for setup module
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController], // registering the AuthController
            providers: [
                {
                    provide: AuthService, // providing  mock AuthService
                    useValue: {
                        signup: jest.fn(), // mocking  signup method
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController); // Getting  authController instance
        authService = module.get<AuthService>(AuthService); // getting  athService instance
    });


    describe('signup', () => {

        it('should return tokens on successful signup', async () => {
            const signupDto: SignupDto = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            const result = { token: 'testToken' }; // expected result
            jest.spyOn(authService, 'signup').mockResolvedValue(result); // mocking signup to return a token

            expect(await authController.signup(signupDto)).toEqual(result); // expect the signup to return the token
        });

        // Test case for signup failure
        it('should throw BadRequestException on signup failure', async () => {
            const signupDto: SignupDto = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            // mock he signup method to throwbadRequestException
            jest.spyOn(authService, 'signup').mockRejectedValue(new BadRequestException('Failed to Signup'));

            // here expect the signup to throw  BadRequestException
            await expect(authController.signup(signupDto)).rejects.toThrow(BadRequestException);
        });
    });


    describe('login', () => {

        // Ttst case for successful login
        it('should return tokens and user on successful login', async () => {
            const loginDto: LoginDto = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockUser = {
                _id: 'userId',
                id: 'userId',
                email: 'test@example.com',
                password: 'hashedPassword',
                toObject: jest.fn().mockReturnValue({
                    _id: 'userId',
                    email: 'test@example.com',
                }),
            };

            const result = { token: 'testToken', user: mockUser }; // this is expected result
            jest.spyOn(authService, 'login').mockResolvedValue(result as any); // i mocking login to return  token and user

            expect(await authController.login(loginDto)).toEqual(result); // expect te login to return the token and user
        });

        // Test case for login failure
        it('should throw UnauthorizedException on login failure', async () => {
            const loginDto: LoginDto = {
                email: 'test@example.com',
                password: 'wrongpassword',
            };

            // this for mock the login method to throw  BadRequestException
            jest.spyOn(authService, 'login').mockRejectedValue(new BadRequestException('Failed to Login'));

            // expect the login to throw  nadRequestException
            await expect(authController.login(loginDto)).rejects.toThrow(BadRequestException);
        });
    });
});