import { it, expect, describe, onTestFinished } from 'vitest';
import accountServices from './account.services.js';
import inMemoryRepository from '../repositories/in-memory/in-memory-account-repositories.js';

describe('Account Services', () => {
    describe('listAccountsService', () => {
        it('should return the message "There are no registered accounts."', async () => {
            try {
                await accountServices.listAccountsService(inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('There are no registered accounts.');
            }
        });

        it('should return the complete account db', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            })
            onTestFinished(() => inMemoryRepository.db.pop());
            const allAccounts = await accountServices.listAccountsService(inMemoryRepository);
            expect(allAccounts.length).toBeGreaterThan(0);
            expect(allAccounts[0].user.name).toBe("John Doe");
        });
    });

    describe('createAccountService', () => {
        it('should throw an error if email is already in use', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            const newAccount = {
                name: "Jane Doe",
                cpf: "55443322110",
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "test@example.com", // Duplicate email
                password: "test_password2"
            };
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.createAccountService(newAccount, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('An account already exists with the CPF or email provided.');
            }
        });

        it('should throw an error if CPF is already in use', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            const newAccount = {
                name: "Jane Doe",
                cpf: "00112233445", // Duplicate CPF
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "jane@example.com",
                password: "test_password2"
            };
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.createAccountService(newAccount, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('An account already exists with the CPF or email provided.');
            }
        });

        it('should create an account successfully with valid data', async () => {
            const newAccount = {
                name: "Jane Doe",
                cpf: "55443322110",
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "jane@example.com",
                password: "test_password2"
            };
            onTestFinished(() => inMemoryRepository.db.pop());
            await accountServices.createAccountService(newAccount, inMemoryRepository);
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(1);
            expect(allAccounts[0].user.name).toBe("Jane Doe");
        });
    });

    describe('updateUserService', () => {
        it('should throw an error if bank account not found', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            const updateAccount = {
                name: "John Doe",
                cpf: "00112233445",
                birthdate: "2000-01-01",
                phonenumber: "122333-9999",
                email: "john@example.com",
                password: "test_password"
            };
            const accountNumber = '2';
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.updateUserService(updateAccount, accountNumber, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('Bank Account not found.');
            }
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(1);
            expect(allAccounts[0].user.email).toBe("test@example.com");
        });
        it('should throw an error if CPF is already in use and not update', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            inMemoryRepository.db.push({
                accountNumber: '2',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "Jane Doe",
                    cpf: "11223344556",
                    birthdate: "1990-01-01",
                    phonenumber: "999888-7777",
                    email: "jane@example.com",
                    password: "test_password"
                }
            });
            const updateAccount = {
                name: "Jane Doe",
                cpf: "00112233445", // Duplicate CPF
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "jane@test.com",
                password: "test_password2"
            };
            const accountNumber = '2';
            onTestFinished(() => inMemoryRepository.db.pop());
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.updateUserService(updateAccount, accountNumber, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('An account already exists with the CPF or email provided.');
            }
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(2);
            expect(allAccounts[1].user.email).toBe("jane@example.com");
            expect(allAccounts[1].user.password).toBe("test_password");
        });
        it('should throw an error if email is already in use and not update', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            inMemoryRepository.db.push({
                accountNumber: '2',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "Jane Doe",
                    cpf: "11223344556",
                    birthdate: "1990-01-01",
                    phonenumber: "999888-7777",
                    email: "jane@example.com",
                    password: "test_password"
                }
            });
            const updateAccount = {
                name: "Jane Doe",
                cpf: "11223344556",
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "test@example.com", // Duplicate email
                password: "test_password2"
            };
            const accountNumber = '2';
            onTestFinished(() => inMemoryRepository.db.pop());
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.updateUserService(updateAccount, accountNumber, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('An account already exists with the CPF or email provided.');
            }
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(2);
            expect(allAccounts[1].user.email).toBe("jane@example.com");
            expect(allAccounts[1].user.password).toBe("test_password");
        });
        it('should update an account successfully with valid data', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "test@example.com",
                    password: "test_password"
                }
            });
            inMemoryRepository.db.push({
                accountNumber: '2',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "Jane Doe",
                    cpf: "11223344556",
                    birthdate: "1990-01-01",
                    phonenumber: "999888-7777",
                    email: "jane@example.com",
                    password: "test_password"
                }
            });
            const updateAccount = {
                name: "Jane Doe",
                cpf: "11223344556",
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "jane@test.com",
                password: "test_password2"
            };
            const accountNumber = '2';
            onTestFinished(() => inMemoryRepository.db.pop());
            onTestFinished(() => inMemoryRepository.db.pop());
            await accountServices.updateUserService(updateAccount, accountNumber, inMemoryRepository);
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(2);
            expect(allAccounts[1].user.email).toBe("jane@test.com");
            expect(allAccounts[1].user.password).toBe("test_password2");
        });
    });

    describe('deleteAccountService', () => {
        it('should throw an error if bank account not found', async () => {
            const accountNumber = '1';
            try {
                await accountServices.deleteAccountService(accountNumber, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('Bank Account not found.');
            }
        });
        it('should throw an error if balance is greater than zero', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 100,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "john@example.com",
                    password: "test_password"
                }
            });
            const accountNumber = '1';
            onTestFinished(() => inMemoryRepository.db.pop());
            try {
                await accountServices.deleteAccountService(accountNumber, inMemoryRepository);
            } catch (e) {
                expect(e.message).toBe('Balance greater than zero.');
            }
        });
        it('should delete the account successfully if balance is zero', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 0,
                createdAt: new Date(),
                user: {
                    name: "John Doe",
                    cpf: "00112233445",
                    birthdate: "2000-01-01",
                    phonenumber: "122333-9999",
                    email: "john@example.com",
                    password: "test_password"
                }
            });
            const accountNumber = '1';
            onTestFinished(() => inMemoryRepository.db.pop());
            await accountServices.deleteAccountService(accountNumber, inMemoryRepository);
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(0);
        });
    });
});
