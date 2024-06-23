import { Responder } from '../lib'
import { getLLM, generateAnswer } from '../clients/LLMClient'
import db from '../../models'
const Questions = db.Questions

const LLM = getLLM();

const genAns = async (req, res) => {
    try {
        const { question } = req.body
        const userId = req.userId
        console.log(userId)
        const answer = await generateAnswer(LLM, question);
        let dbQue;
        await db.sequelize.transaction(async t => {
            console.log("inside sequelize transaction ")
            dbQue = await Questions.create({
                que: question,
                UserId: userId,
                generatedAnswer: answer,
            })
        })
        return Responder.created(res, {
            question: question,
            answer: answer,
            questionId: dbQue.id,
            message: `Answer fetched successfully.`,
        })
    } catch (error) {
        console.log("validation error", error)
        return Responder.operationFailed(res, { error, status: 400 })
    }
};

const getQue = async (req, res) => {
    try {
        const questionId = req.params.questionId
        const que = await Questions.findOne({where: {id: questionId}});
        if (!que) {
            return Responder.operationFailed(res, {
                success: false,
                error:
                    'Question not found!',
                status: 400,
            })
        }
        return Responder.success(res, {
            question: que.que,
            answer: que.generatedAnswer,
            message: `Question-Answer fetched successfully.`,
        })
    } catch (error) {
        console.log("validation error", error)
        return Responder.operationFailed(res, { error, status: 400 })
    }
};

module.exports = { genAns, getQue };