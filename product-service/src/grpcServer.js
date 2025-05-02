const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Product = require('./models/product.model');

const PROTO_PATH = __dirname+"/utils/proto/product.proto"
const packageDefinition  = protoLoader.loadSync(PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
const grpcObject = grpc.loadPackageDefinition(packageDefinition).product;

const productService = {
    getProductById: async (req, res) =>{
        try {
            const product = await Product.findById(req.request.id);
            if (!product) return callback(new Error('Product not found'), null);
            res(null, {
                id: product._id.toString(),
                name: product.name,
                price: product.price,
                stock: product.stock,
                sku: product.sku
            });
        } catch (error) {
            res(error)
        }
    },
    updateProductQuantity: async (req, res) =>{
        try {
            const { productId , quantity } = req.request;
            
            const product = await Product.findById(productId);
            if (!product) return res(null, { success: false, message: "Product not found" });
      
            if (product.stock < quantity) {
              return res(null, { success: false, message: "Insufficient stock" });
            }
      
            product.stock -= quantity;
            await product.save();
      
            res(null, { success: true, message: "Stock updated successfully" });
          } catch (error) {
            res(error);
          }
    }

}

function startGRPCServer() {
    const server = new grpc.Server();
    server.addService(grpcObject.ProductService.service, productService);
    
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('🛰️ gRPC server running at 0.0.0.0:50051');
    });
}

module.exports = startGRPCServer;