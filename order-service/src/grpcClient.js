const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = __dirname+"/utils/proto/product.proto"

const packageDefinition  = protoLoader.loadSync(PROTO_PATH)
const grpcObject = grpc.loadPackageDefinition(packageDefinition)

const productProto = grpcObject.product

const client = new productProto.ProductService(
    'product-service:50051',
    grpc.credentials.createInsecure()
)


module.exports = client