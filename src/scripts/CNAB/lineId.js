export const LINE_IDS = {
  400: {
    TRAILER: '9',
    HEADER: '0',
    VALID_REGISTERS: ['1', '2', '3', '7'],
    REQUIRES_REGISTER_1: ['2', '3', '7'], // These registers must be preceded by register 1
  },
  // Add other CNAB types here
  // 240: {
  //   TRAILER: '9',
  //   HEADER: '0',
  //   ...
  // }
};
