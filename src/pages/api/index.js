import messageSent from '../../../messages.json';

export default function handler(req, res) {
    res.status(201).json( messageSent );
  }