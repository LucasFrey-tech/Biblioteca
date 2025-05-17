import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from 'src/database/config/db-config';

interface AutorAttributes {
    id: number;
    name: string;
}