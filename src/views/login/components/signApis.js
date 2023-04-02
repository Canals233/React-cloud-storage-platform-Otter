/**
 *
 * @param {string} rawMessage
 * @returns {string}
 */

export const messageMap = (rawMessage) => {
	if (rawMessage.includes("id无效")) {
		return "用户未注册，请先点击注册按钮进行注册";
	} else if (rawMessage.includes("密码验证失败")) {
		return "密码错误，请重新输入";
	}
    else if(rawMessage.includes("id已经被占用")) {
        return "该用户名已被占用，请重新输入";
    }
	return "";
};

export const testPassword = (password) => {
    if(password.length < 6 || password.length > 16) return false;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,16}$/;
	return passwordRegex.test(password);
};
