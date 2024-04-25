
const Author = require('../src/models/author.model');



describe('Author model tests', () => {

    afterEach(async function () {
        await Author.deleteMany();
    });


    it.skip('should create a new author', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            yearOfBirth: 1990,
            primaryGenre: 'Fiction'
        };
        // const author = await Author.create(userData);
        // expect(author).toMatchObject(userData);

        const authors = await Author.find();
        expect(authors).toHaveLength(0);
    });
});