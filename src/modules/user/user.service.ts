import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  /*  let result;
  if (role) {
    result = await pool.query(
      `
    INSERT INTO users (name, email, password, age, role) VALUES ($1,$2,$3,$4,$5)   RETURNING *
    `,
      [name, email, hashedPassword, age, role],
    );
  } else {
    result = await pool.query(
      `
    INSERT INTO users (name, email, password, age) VALUES ($1,$2,$3,$4)   RETURNING *
    `,
      [name, email, hashedPassword, age],
    );
  }
 */

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, age, role) VALUES ($1,$2,$3,$4,COALESCE($5,'user'))   RETURNING *
    `,
    [name, email, hashedPassword, age, role],
  );
  delete result.rows[0].password;
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);

  const usersWithoutPassword = result.rows.map((user) => {
    delete user.password;
    return user;
  });

  return usersWithoutPassword;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users
    WHERE id=$1
    `,
    [id],
  );

  delete result.rows[0].password;
  return result;
};

const updateUserFromDB = async (id: string, payload: Partial<IUser>) => {
  const { name, password, age, is_active } = payload;

  // const result = await pool.query(
  //   `
  // UPDATE users
  // SET name=$1,password=$2,age=$3,is_active=$4
  // WHERE id=$5 RETURNING *
  // `,
  //   [name, password, age, is_active, id],
  // );
  const result = await pool.query(
    `
    UPDATE users
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age),
    is_active=COALESCE($4,is_active)
    WHERE id=$5 RETURNING *
    `,
    [name, password, age, is_active, id],
  );

  delete result.rows[0].password;
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE id=$1
      
      `,
    [id],
  );

  return result;
};
export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
