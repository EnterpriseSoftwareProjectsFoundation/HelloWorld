
import { fromFileUrl , dirname , join } from 'Path'


const folder = dirname(fromFileUrl(import.meta.url));


export const project
     = join(folder,'..')

export const data
     = join(project,'Data');

export const font
     = join(data,'Font');