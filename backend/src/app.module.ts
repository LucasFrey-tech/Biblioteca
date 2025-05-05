import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { UsersModule } from "./modules/users/users.module";
import { BooksModule } from "./modules/books/books.module";
import { CartModule } from "./modules/cart/cart.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        UsersModule,
        BooksModule,
        CartModule,
    ],
})
export class AppModule {}