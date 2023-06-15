const { getUserId } = require('../utils');
const { deleteUserData } = require('../utils/database');

export default async function deleteUser(req, res) {
  if (req.method === 'POST') {
    try {
      const authToken = req.headers.authorization;
      const userId = getUserId(authToken);
      const response = await deleteUserData({ userId });

      return res.status(200).json({ success: !!response });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  }
  return res
    .status(500)
    .json({ error: { statusCode: 500, message: 'Bad request' } });
}
