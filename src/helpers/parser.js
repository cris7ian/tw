import { Node } from '../models/Node'

export const parser = data =>
  data.split(', ').map(node => new Node(node[0], node[1], node[2]))
