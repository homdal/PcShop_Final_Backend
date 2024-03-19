class EshopError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}
export default EshopError;
