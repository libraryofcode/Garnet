module.exports = class KernelError extends Error {
  constructor(message) {
    super(message);
    this.name = 'KernelError';
  }
};