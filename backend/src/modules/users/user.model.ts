import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from 'src/database/config/db-config';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    admin: boolean;
    disabled: boolean;
    image?: string;
    registration_date?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'admin' | 'disabled' | 'image' | 'registration_date'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public admin!: boolean;
    public disabled!: boolean;
    public image?: string;
    public registration_date?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        image: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'users',
        sequelize,
        timestamps: false,
    }
);

export default User;