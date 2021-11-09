import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Servicio,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoServicioController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/servicio', {
    responses: {
      '200': {
        description: 'Pedido has one Servicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Servicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio> {
    return this.pedidoRepository.servicio(id).get(filter);
  }

  @post('/pedidos/{id}/servicio', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.pedidoRepository.servicio(id).create(servicio);
  }

  @patch('/pedidos/{id}/servicio', {
    responses: {
      '200': {
        description: 'Pedido.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.pedidoRepository.servicio(id).patch(servicio, where);
  }

  @del('/pedidos/{id}/servicio', {
    responses: {
      '200': {
        description: 'Pedido.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.pedidoRepository.servicio(id).delete(where);
  }
}
