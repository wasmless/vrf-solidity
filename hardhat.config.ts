import { task } from 'hardhat/config';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

const config: HardhatUserConfig = {
	networks: {
		hardhat: {
			mining: {
				auto: true,
				interval: 1,
			},
			// loggingEnabled: true,
		},
		bsc: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			accounts: {
				mnemonic:
					'crucial away alert inquiry sentence heart stereo plastic derive snap much glue provide save office',
			},
		},
	},
	solidity: {
		version: '0.8.4',
		settings: {
			optimizer: {
				enabled: true,
				runs: 1000,
			},
		},
	},
	paths: {
		sources: './sol',
	},
	mocha: {
		timeout: 100000000,
	},
	typechain: {
		outDir: './src/typechain',
	},
};

export default config;
