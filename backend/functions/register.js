// 외부파일에서 가져온 응답전송
const sendResponse = require("../utils/sendResponse");
// 다른 모듈에서 가져온 경로/aws리소스이름
const {
    PHOTOS_TABLE,
    ORIGINAL_BUCKET_NAME,
    THUMBNAIL_BUCKET_NAME,
    USER_POOL,
} = require("../const/paths");

// aws sdk의 서비스 인스턴스
const { s3, rekognition, dynamoDb, cognito } = require("../const/providers");
module.exports.register = async (event) => {
    try {
        const { email, password} = JSON.parse(event.body);
        
        const result = await cognito
            .adminCreateUser({
                UserPoolId: USER_POOL,
                Username: email,
                UserAttributes: [
                    {
                        Name: "email",
                        Value: email,
                    }, 
                    {
                        Name: "email_verified",
                        Value: "true"
                    },
                ],
                MessageAction: "SUPPRESS",
            })
            .promise();
        
        if(result.User) {
            await cognito
                .adminSetUserPassword({
                    Password: password,
                    UserPoolId: USER_POOL,
                    Username: email,
                    Permanent: true,
                })
                .promise();
        }
    
        return sendResponse(200, { result });
    } catch (error) {
        console.error(error);
        return sendResponse(400, error);
    }
};
