const validLoginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const validUserResponse = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: hashedPassword,
  // senha: secret_admin
}

const validToken = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzIyNDcyNiwiZXhwIjoxNjk0MDg4NzI2fQ.j4qhE67SGr3Zz5ikJaErvtMVEuaPHZLWUxQYEAL_LjU'
}

const invalidLoginBody = {
  email: 'admin@admin.com',
  password: 'secret_admi',
}

const inexistentUserLoguinBody = {
  email: 'admin@admin.co',
  password: 'secret_admin',
}

export default {
  validLoginBody,
  validUserResponse,
  validToken,
  invalidLoginBody,
  inexistentUserLoguinBody,
}