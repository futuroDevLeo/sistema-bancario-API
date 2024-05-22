import { it, expect, describe, onTestFinished } from 'vitest';
import consultServices from './consult.services.ts';
import inMemoryRepository from '../repositories/in-memory/in-memory-account-repositories.ts';

describe('Consult Services', () => {
    describe('checkBalanceService', () => {
        it('should throw an error if bank account not found', async () => {
            const accountNumber = '1';
            try {
                await consultServices.checkBalanceService(accountNumber, inMemoryRepository);
            } catch (e: any) {
                expect(e.message).toBe('Bank Account not found.');
            }
        });

        it('should return the correct balance when the bank account is found', async () => {
            inMemoryRepository.db.push({
                accountNumber: '1',
                balance: 100,
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
            onTestFinished(() => {
                while (inMemoryRepository.db.length > 0) {
                    inMemoryRepository.db.pop();
                }
            });
            const accountNumber = '1';
            const bankAccount = await consultServices.checkBalanceService(accountNumber, inMemoryRepository);
            expect(bankAccount.balance).toBe(100);
        });

        it('should return the correct balance when there are multiple accounts', async () => {
            inMemoryRepository.db.push({
                accountNumber: '3',
                balance: 300,
                createdAt: new Date(),
                user: {
                    name: "Alice",
                    cpf: "00112233447",
                    birthdate: "2000-03-01",
                    phonenumber: "122333-7777",
                    email: "test3@example.com",
                    password: "test_password3"
                }
            });
            inMemoryRepository.db.push({
                accountNumber: '4',
                balance: 400,
                createdAt: new Date(),
                user: {
                    name: "Bob",
                    cpf: "00112233448",
                    birthdate: "2000-04-01",
                    phonenumber: "122333-6666",
                    email: "test4@example.com",
                    password: "test_password4"
                }
            });
            onTestFinished(() => {
                while (inMemoryRepository.db.length > 0) {
                    inMemoryRepository.db.pop();
                }
            });
            const accountNumber1 = '3';
            const bankAccount1 = await consultServices.checkBalanceService(accountNumber1, inMemoryRepository);
            expect(bankAccount1.balance).toBe(300);
            const accountNumber2 = '4';
            const bankAccount2 = await consultServices.checkBalanceService(accountNumber2, inMemoryRepository);
            expect(bankAccount2.balance).toBe(400);
        });
    });
});