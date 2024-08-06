import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../src/users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const userModel = app.get<Model<User>>(getModelToken('User'));

        // Initialiser les données de test
        await userModel.deleteMany({});
        const hashedPassword = await bcrypt.hash('password', 10);
        await userModel.create({ username: 'testuser', password: hashedPassword });
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/login (POST) - should login successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'testuser', password: 'password' })
            .expect(200);

        expect(response.body).toHaveProperty('access_token');
    });

    it('/auth/login (POST) - should fail with wrong credentials', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'testuser', password: 'wrongpassword' })
            .expect(401);
    });
});
