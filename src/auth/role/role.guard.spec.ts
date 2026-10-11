import { RoleGuard } from './role.guard.js';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard(null)).toBeDefined();
  });
});
