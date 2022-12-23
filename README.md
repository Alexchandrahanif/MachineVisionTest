# MachineVisionTest

# Mulai jumat,17-12-2022 s/d Rabu,22-12-2022

## Tech Stack

### Server

1. Node.js
2. Express.js
3. Sequelize
4. JWT
5. Bcrypjs
6. Multer
7. Cloudinary

### Client

1. React.js
2. Axios
3. Redux Toolkit
4. React Redux
5. Mui Componen (Modals)
6. React Boostrep

## Tugas/Desk

1. Login
   - jwt
2. Home
   - like-Dislike
   - Pagination
   - Search caption or tags
3. User
   - View Detail User
   - Update data user
4. Change Password
5. Post
   - like/dislike
   - pagination
   - search caption or tags
   - delete post
   - edit post
6. logout

## menjalankan aplikasi => Buka terminal

### Server

1. cd server
2. npm i
3. npm run seed (menggunakan database PostgreSQL)
4. npm run start

### Client

1. cd client
2. npm i
3. npm run start

## API :

1. Register
2. Login
3. Logout
4. Get All Users
5. Get User by ID
6. Edit User
7. Change Password User
8. Delete User
9. Get All Post
10. Get Post By ID
11. Get Post By UserID
12. Create Post
13. Edit Post
14. Like Post
15. Unlike Post
16. Delete Post
17. Upload Foto/file

## tambahan diluar tugas/desk

18. Get All UserLike by User Id => untuk mendapatkan data post yg sudah di like, untuk keperluan PostPage

## catatan :

1. Untuk Login sudah menggunakan JWT, dan password sudah di bcrypt
2. untuk Endpoint changePassword sudah di validasi, supaya yg boleh changePassword harus login dahulu, atau JWT nya harus sesuai/tidak boleh menggubah password user lain baik di sisi server maupun sisi client
3. begitu juga saat edit post, delete post, user tidak boleh meng-edit dan delete post user lain, di validasi di server dan client
4. untuk upload foto/image saya menggunakan multer dan cloudinary
5. untuk RestAPI Like, sudah divalidasi di server, tidak bolek like 2 kali
6. begitu RestApi Unlike, tidak boleh Unlike sebelum like atau Unlike 2x
