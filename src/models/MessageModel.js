export default class MessageModel
{
    constructor(userId,content,id=0)
    {
        this.userId=userId;
        this.content=content;
        this.id=id;
    }
}