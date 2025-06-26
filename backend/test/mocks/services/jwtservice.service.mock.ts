export const mockJwtService = {
    sign: jest.fn().mockResolvedValue( { email: "user.email", sub: "user.id", username: "user.username", admin: "user.admin" }),
}