/**
 *
 * @param {string} errorMsg
 * @returns {string}
 */

export const messageMap = (errorMsg) => {
	if (errorMsg.includes("id无效")) {
		return "用户未注册，请先点击注册按钮进行注册";
	} else if (errorMsg.includes("密码验证失败")) {
		return "密码错误，请重新输入";
	}
    else if(errorMsg.includes("id已经被占用")) {
        return "该用户名已被占用，请重新输入";
    }
	return "";
};

export const testPassword = (password) => {
    if(!password) return false;
    if(password.length < 6 || password.length > 16) return false;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,16}$/;
	return passwordRegex.test(password);
};
export const testEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[a-z0-9]+([._-][a-z0-9]+)*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.)+[a-z]{2,}$/;
    return emailRegex.test(email);
}