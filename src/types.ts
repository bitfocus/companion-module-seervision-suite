import InstanceSkel from '../../../instance_skel'

export type Config = {
	host: string
	instanceIndex: number
}

export type Instance = InstanceSkel<Config>

export interface Logger {
	log: Instance['log']
}
