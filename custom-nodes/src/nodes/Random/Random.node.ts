import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:Random.node.icon.svg',
		group: ['transform'],
		version: 1,
		description: 'Gera números aleatórios utilizando o Random.org',
		defaults: {
			name: 'Random',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						description: 'Generate a random number',
						action: 'Generate a random number',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'O menor valor (inclusivo)',
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				description: 'O maior valor (inclusivo)',
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
			},
		],
	};

	 async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i) as number;
            const max = this.getNodeParameter('max', i) as number;

			if (min >= max) {
				throw new Error(
					`Parâmetros inválidos: "Mínimo" (${min}) deve ser menor que "Máximo" (${max}).`
				);
			}
			try {
				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://www.random.org/integers/',
					qs: {
						num: 1,
						min,
						max,
						col: 1,
						base: 10,
						format: 'plain',
						rnd: 'new',
					},
					json: false,
					});
				const body = Buffer.isBuffer(response)
					? response.toString('utf8')
					: String(response);

				const randomNumber = parseInt(body.trim(), 10);


				returnData.push({
					json: {
						random: randomNumber,
						min,
						max,
					},
				});
			}catch (error) {
				throw new Error(
					`Falha ao obter número aleatório do Random.org. 
					 Detalhes: ${(error as Error).message}`
				);
			}
        }

        return this.prepareOutputData(returnData);
    }
}