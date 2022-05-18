import 'hardhat';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

import { ethers } from 'hardhat';
import { expect } from './chai';
import { WasmlessRandomness } from '../src';
import { Deployer } from '../scripts/deploy';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';
import { arrayify, formatEther, hexlify, parseEther, toUtf8Bytes } from 'ethers/lib/utils';

describe('WebX card test', async () => {
	let s1: SignerWithAddress;
	let s2: SignerWithAddress;
	let s3: SignerWithAddress;

	let randomness: WasmlessRandomness;

	beforeEach(async () => {
		[s1, s2, s3] = await ethers.getSigners();

		const deployer = new Deployer();

		randomness = await deployer.deploy('WasmlessRandomness');
	});

	// it('verify', async () => {
	// 	let pi_string = arrayify(
	// 		'0x0348e1f3c290f21cd199067bf2daa4dbcdad71df85d37ca35372e7e3f8763f29fffad1549b7f0e3064291179efe5634f47ae05b734e27c1b8ea15ecb230a94921c5c4ca2f9bc5bd4b9fd48f30a6d79e160',
	// 	);

	// 	let pk_string = arrayify(
	// 		'0x0243af0f1482ce772f7e9f675813cf747749320916e19111af3677aa70c5d0633d',
	// 	);

	// 	let message = toUtf8Bytes('hello world~~~~');

	// 	let pk = await randomness.decodePoint(pk_string);

	// 	let proof = await randomness.decodeProof(pi_string);

	// 	await expect(randomness.verify(pk, proof, message)).to.be.eventually.true;
	// });

	it('response', async () => {
		let pi_string = arrayify(
			'0x0348e1f3c290f21cd199067bf2daa4dbcdad71df85d37ca35372e7e3f8763f29fffad1549b7f0e3064291179efe5634f47ae05b734e27c1b8ea15ecb230a94921c5c4ca2f9bc5bd4b9fd48f30a6d79e160',
		);

		let pk_string = arrayify(
			'0x0243af0f1482ce772f7e9f675813cf747749320916e19111af3677aa70c5d0633d',
		);

		let message = toUtf8Bytes('hello world~~~~');

		let pk = await randomness.decodePoint(pk_string);

		let proof = await randomness.decodeProof(pi_string);

		let balance = await s1.getBalance();

		await (await randomness.response(pk, proof, message)).wait();

		console.log('gas used', formatEther(balance.sub(await s1.getBalance())));
	});

	// it('fast verify', async () => {
	// 	let pi_string = arrayify(
	// 		'0x0348e1f3c290f21cd199067bf2daa4dbcdad71df85d37ca35372e7e3f8763f29fffad1549b7f0e3064291179efe5634f47ae05b734e27c1b8ea15ecb230a94921c5c4ca2f9bc5bd4b9fd48f30a6d79e160',
	// 	);

	// 	let pk_string = arrayify(
	// 		'0x0243af0f1482ce772f7e9f675813cf747749320916e19111af3677aa70c5d0633d',
	// 	);

	// 	let message = toUtf8Bytes('hello world~~~~');

	// 	let pk = await randomness.decodePoint(pk_string);

	// 	let proof = await randomness.decodeProof(pi_string);

	// 	let [u_point, v_component] = await randomness.computeFastVerifyParams(pk, proof, message);

	// 	await expect(randomness.fastVerify(pk, proof, message, u_point, v_component)).to.be
	// 		.eventually.true;

	// 	let hash = await randomness.gammaToHash(proof[0], proof[1]);

	// 	expect(hexlify(hash)).to.be.equal(
	// 		'0x39305e610aa86008d8a0018cbad3f0036477cabe9f40e93afe392fbf5dd21bd3',
	// 	);

	// 	// await expect(randomness.gammaToHash(proof[0], proof[1])).to.be.eventually.equal(
	// 	// 	arrayify('0x39305e610aa86008d8a0018cbad3f0036477cabe9f40e93afe392fbf5dd21bd3'),
	// 	// );
	// });
});
