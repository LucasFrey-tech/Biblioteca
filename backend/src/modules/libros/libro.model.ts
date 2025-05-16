import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from 'src/database/config/db-config';

interface BookAttributes {
    id: number;
    tittle: string;
    author_id: number;
    description: string;
    isbn: string;
    image?: string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!:number;
    public tittle: string;
    public author_id: number;
    public description: string;
    public isbn: string;
    public image?: string;
    public stock!: number;
    public subscriber_exclusive: boolean;
    public price!: number;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tittle: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subscriber_exclusive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'books',
        sequelize,
    },
);

export default Book;