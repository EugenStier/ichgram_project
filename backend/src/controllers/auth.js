import bcrypt from "bcrypt";
import user from "../models/User.js";
import jwt from "jsonwebtoken";
//регистрируем польз-я
export const register = async (reg, res) => {
  const { usrnsme, email, password, full_name } = reg.body; //деструктурирует обьект на составляющие

  try {
    if (!username || !email || !password || !full_name) {
      //обязательные для заполнения поля
      return res.status(400).json({ message: "All fields required" });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { full_name }], //определяем параметры по которым не д.б.совпадения
    });

    if (existingUser) {
      //если есть совпадения,то информ-ем польз.что регистр.невозможна
      return res.status(400).json({
        message:
          "User with such username or email is already has been registred",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //хеширует пароль перед сохр. в БД
    const user = new User({
      // создается новая модель пользователя
      username,
      email,
      password: hashedPassword,
      full_name,
    });

    await user.save(); //сохраняем пользователя в БД

    res.status(201).json({ message: "User has been regsitred successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      //проверяем переданы ли данные (пароль и почта)
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email }); //проверка в БД наличия почты

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password); //сравнивает пароль

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      //генерирует JWT токен с id, ключом и сроком
      expiresIn: "1h", //токен живет 1 час
    });

    res.status(200).json({ token }); //возвращение токена клиенту
  } catch (error) {
    //обработка возможных ошибок
    res.status(500).json({ message: "Login error" });
  }
};
