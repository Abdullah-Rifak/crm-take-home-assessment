import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
	constructor(
		@InjectModel('User') private readonly userModel: Model<UserDocument>,
	) {}

	async onModuleInit() {
		await this.seedDefaultAdmin();
	}

	findByEmail(email: string) {
		return this.userModel.findOne({ email: email.toLowerCase().trim() }).exec();
	}

	async seedDefaultAdmin() {
		const existingAdmin = await this.findByEmail('admin@example.com');

		if (existingAdmin) {
			return existingAdmin;
		}

		return this.userModel.create({
			email: 'admin@example.com',
			password: await bcrypt.hash('password123', 10),
		});
	}
}
