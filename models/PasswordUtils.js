const crypto = require('crypto');

//On verifie si le mdp hash base donnees pareil 
// que le hash mdp donner
// Le salt est la valeur pour hasher
function validatePassword(password, hash, salt){
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify; 
}

//On genere le hash du mdp a stocker
function genPassword(password) {
	var salt = crypto.randomBytes(32).toString('hex');
	//Methode HMAC apparamment, ici on utilise 64 bits de clé, 10000 iterations
	// https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest
	var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	return {
		salt: salt,
		hash: genHash
	};
}

function isAuth(req, res, next){
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;
module.exports.isAuth = isAuth;