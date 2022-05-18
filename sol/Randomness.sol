// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './VRF.sol';

contract WasmlessRandomness {
	mapping(uint256 => bytes32) private _data;

	function decodeProof(bytes memory _proof) public pure returns (uint256[4] memory) {
		return VRF.decodeProof(_proof);
	}

	function decodePoint(bytes memory _point) public pure returns (uint256[2] memory) {
		return VRF.decodePoint(_point);
	}

	function computeFastVerifyParams(
		uint256[2] memory _publicKey,
		uint256[4] memory _proof,
		bytes memory _message
	) public pure returns (uint256[2] memory, uint256[4] memory) {
		return VRF.computeFastVerifyParams(_publicKey, _proof, _message);
	}

	function verify(
		uint256[2] memory _publicKey,
		uint256[4] memory _proof,
		bytes memory _message
	) public pure returns (bool) {
		return VRF.verify(_publicKey, _proof, _message);
	}

	function fastVerify(
		uint256[2] memory _publicKey,
		uint256[4] memory _proof,
		bytes memory _message,
		uint256[2] memory _uPoint,
		uint256[4] memory _vComponents
	) public pure returns (bool) {
		return VRF.fastVerify(_publicKey, _proof, _message, _uPoint, _vComponents);
	}

	function gammaToHash(uint256 _gammaX, uint256 _gammaY) public pure returns (bytes32) {
		return VRF.gammaToHash(_gammaX, _gammaY);
	}

	function response(
		uint256[2] memory _publicKey,
		uint256[4] memory _proof,
		bytes memory _message
	) public {
		require(this.verify(_publicKey, _proof, _message), 'verify failed');

		_data[0] = this.gammaToHash(_proof[0], _proof[1]);
	}
}
