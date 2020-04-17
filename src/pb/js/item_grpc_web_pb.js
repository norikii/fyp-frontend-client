/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.proto = require('./item_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.ItemServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.ItemServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.CreateItemReq,
 *   !proto.proto.CreateItemRes>}
 */
const methodDescriptor_ItemService_CreateItem = new grpc.web.MethodDescriptor(
  '/proto.ItemService/CreateItem',
  grpc.web.MethodType.UNARY,
  proto.proto.CreateItemReq,
  proto.proto.CreateItemRes,
  /**
   * @param {!proto.proto.CreateItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.CreateItemRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.CreateItemReq,
 *   !proto.proto.CreateItemRes>}
 */
const methodInfo_ItemService_CreateItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.CreateItemRes,
  /**
   * @param {!proto.proto.CreateItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.CreateItemRes.deserializeBinary
);


/**
 * @param {!proto.proto.CreateItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.CreateItemRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.CreateItemRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServiceClient.prototype.createItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.ItemService/CreateItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_CreateItem,
      callback);
};


/**
 * @param {!proto.proto.CreateItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.CreateItemRes>}
 *     A native promise that resolves to the response
 */
proto.proto.ItemServicePromiseClient.prototype.createItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.ItemService/CreateItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_CreateItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ReadItemReq,
 *   !proto.proto.ReadItemRes>}
 */
const methodDescriptor_ItemService_ReadItem = new grpc.web.MethodDescriptor(
  '/proto.ItemService/ReadItem',
  grpc.web.MethodType.UNARY,
  proto.proto.ReadItemReq,
  proto.proto.ReadItemRes,
  /**
   * @param {!proto.proto.ReadItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.ReadItemRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ReadItemReq,
 *   !proto.proto.ReadItemRes>}
 */
const methodInfo_ItemService_ReadItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.ReadItemRes,
  /**
   * @param {!proto.proto.ReadItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.ReadItemRes.deserializeBinary
);


/**
 * @param {!proto.proto.ReadItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.ReadItemRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.ReadItemRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServiceClient.prototype.readItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.ItemService/ReadItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_ReadItem,
      callback);
};


/**
 * @param {!proto.proto.ReadItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.ReadItemRes>}
 *     A native promise that resolves to the response
 */
proto.proto.ItemServicePromiseClient.prototype.readItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.ItemService/ReadItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_ReadItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.UpdateItemReq,
 *   !proto.proto.UpdateItemRes>}
 */
const methodDescriptor_ItemService_UpdateItem = new grpc.web.MethodDescriptor(
  '/proto.ItemService/UpdateItem',
  grpc.web.MethodType.UNARY,
  proto.proto.UpdateItemReq,
  proto.proto.UpdateItemRes,
  /**
   * @param {!proto.proto.UpdateItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UpdateItemRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.UpdateItemReq,
 *   !proto.proto.UpdateItemRes>}
 */
const methodInfo_ItemService_UpdateItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.UpdateItemRes,
  /**
   * @param {!proto.proto.UpdateItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UpdateItemRes.deserializeBinary
);


/**
 * @param {!proto.proto.UpdateItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.UpdateItemRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.UpdateItemRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServiceClient.prototype.updateItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.ItemService/UpdateItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_UpdateItem,
      callback);
};


/**
 * @param {!proto.proto.UpdateItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.UpdateItemRes>}
 *     A native promise that resolves to the response
 */
proto.proto.ItemServicePromiseClient.prototype.updateItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.ItemService/UpdateItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_UpdateItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.DeleteItemReq,
 *   !proto.proto.DeleteItemRes>}
 */
const methodDescriptor_ItemService_DeleteItem = new grpc.web.MethodDescriptor(
  '/proto.ItemService/DeleteItem',
  grpc.web.MethodType.UNARY,
  proto.proto.DeleteItemReq,
  proto.proto.DeleteItemRes,
  /**
   * @param {!proto.proto.DeleteItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.DeleteItemRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.DeleteItemReq,
 *   !proto.proto.DeleteItemRes>}
 */
const methodInfo_ItemService_DeleteItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.DeleteItemRes,
  /**
   * @param {!proto.proto.DeleteItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.DeleteItemRes.deserializeBinary
);


/**
 * @param {!proto.proto.DeleteItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.DeleteItemRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.DeleteItemRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServiceClient.prototype.deleteItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.ItemService/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_DeleteItem,
      callback);
};


/**
 * @param {!proto.proto.DeleteItemReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.DeleteItemRes>}
 *     A native promise that resolves to the response
 */
proto.proto.ItemServicePromiseClient.prototype.deleteItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.ItemService/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_ItemService_DeleteItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ListItemReq,
 *   !proto.proto.ListItemRes>}
 */
const methodDescriptor_ItemService_ListItems = new grpc.web.MethodDescriptor(
  '/proto.ItemService/ListItems',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.ListItemReq,
  proto.proto.ListItemRes,
  /**
   * @param {!proto.proto.ListItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.ListItemRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListItemReq,
 *   !proto.proto.ListItemRes>}
 */
const methodInfo_ItemService_ListItems = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.ListItemRes,
  /**
   * @param {!proto.proto.ListItemReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.ListItemRes.deserializeBinary
);


/**
 * @param {!proto.proto.ListItemReq} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.ListItemRes>}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServiceClient.prototype.listItems =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.ItemService/ListItems',
      request,
      metadata || {},
      methodDescriptor_ItemService_ListItems);
};


/**
 * @param {!proto.proto.ListItemReq} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.ListItemRes>}
 *     The XHR Node Readable Stream
 */
proto.proto.ItemServicePromiseClient.prototype.listItems =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.ItemService/ListItems',
      request,
      metadata || {},
      methodDescriptor_ItemService_ListItems);
};


module.exports = proto.proto;

