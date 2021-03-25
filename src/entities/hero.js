export default class Hero {
	constructor({ name, age, power }) {
		this.id = Math.floor(Math.random() * 100) + Date.now();
		this.name = name;
		this.age = age;
		this.power = power;
	}

	isValid() {
		const propertyNames = Object.getOwnPropertyNames(this);
		const amountInvalid = propertyNames
			.map((property) => (!!this[property] ? null : `${property} is Missing!!`))
			.filter((item) => !!item);
		return {
			valid: amountInvalid.length === 0,
			error: amountInvalid,
		};
	}
}
/* 
const hero = new Hero({
	name: 'Chapolin',
	age: 100,
	power: 'superForça',
});

console.log('valid', hero.isValid());
console.log('valid', hero);
 */