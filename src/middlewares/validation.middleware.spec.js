import { it, expect, describe, vi } from 'vitest';
import validationMiddleware from './validation.middleware.js';
// import inMemoryRepository from '../repositories/in-memory/in-memory-account-repositories.js';

describe('Validation Middleware', () => {
    describe('validateBodyFields', () => {
        it('should throw an error with the message "All fields are mandatory." if any field is missing"', () => {
            const req = {
                body: {
                    name: 'John Doe',
                    cpf: '12345678901',
                    birthdate: '2000-01-01',
                    email: 'john@example.com',
                    password: 'password123'
                    // phoneNumber is missing
                }
            }
            const res = {};
            const next = vi.fn();
            try {
                validationMiddleware.validateBodyFields(req, res, next);
            } catch (e) {
                expect(e.message).toBe('All fields are mandatory.');
            }
        });

        it('should call next without error if all fields are present', () => {
            const req = {
                body: {
                    name: 'John Doe',
                    cpf: '12345678901',
                    birthdate: '2000-01-01',
                    phonenumber: '123456789',
                    email: 'john@example.com',
                    password: 'password123'
                }
            }
            const res = {};
            const next = vi.fn();
            validationMiddleware.validateBodyFields(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(next).not.toHaveBeenCalledWith(expect.any(Error));
        });

        it('should call next without error if extra fields are present', () => {
            const req = {
                body: {
                    name: 'John Doe',
                    cpf: '12345678901',
                    birthdate: '2000-01-01',
                    phonenumber: '123456789',
                    email: 'john@example.com',
                    password: 'password123',
                    extraField: 'extraValue' // extra field
                }
            };
            const res = {};
            const next = vi.fn();
            validationMiddleware.validateBodyFields(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(next).not.toHaveBeenCalledWith(expect.any(Error));
        });
    })
});