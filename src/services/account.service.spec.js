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
                    password: "teste_senha"
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
                    password: "teste_senha"
                }
            });

            const newAccount = {
                name: "Jane Doe",
                cpf: "55443322110",
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "test@example.com", // Email duplicado
                password: "teste_senha2"
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
                    password: "teste_senha"
                }
            });

            const newAccount = {
                name: "Jane Doe",
                cpf: "00112233445", // CPF duplicado
                birthdate: "1990-01-01",
                phonenumber: "999888-7777",
                email: "jane@example.com",
                password: "teste_senha2"
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
                password: "teste_senha2"
            };

            onTestFinished(() => inMemoryRepository.db.pop());
            await accountServices.createAccountService(newAccount, inMemoryRepository);
            const allAccounts = inMemoryRepository.db;
            expect(allAccounts.length).toBe(1);
            expect(allAccounts[0].user.name).toBe("Jane Doe");
        });
    });
});