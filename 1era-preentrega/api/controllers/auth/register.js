const path = "public/users.json";
const Container = require("../../../utils/classes/Container");
const container = new Container(path);
const CryptoJs = require("crypto-js");

const CreateNewUser = async (req, res) => {
  const { user, password } = req.body;
  const encryptedPassword = CryptoJs.AES.encrypt(
    password,
    process.env.PASS_SEC
  );
  const data = await container.createNewUser({
    user: user,
    password: encryptedPassword.toString(),
  });

  res.status(200).json(data);
};

module.exports = CreateNewUser;
