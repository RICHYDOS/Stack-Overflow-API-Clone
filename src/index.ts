import express from 'express';
import { settings } from './config/application';
import { sequelizeConnection } from './models/index';
import users from './routes/users';
import questions from './routes/questions';
import answers from './routes/answers';
import questionComments from './routes/question_comments';
import answerComments from './routes/answer_comments';
import errorHandler from './middleware/errorhandler';

const app = express();
const port = settings.port || 5000;

sequelizeConnection.sync().then(() => {
	console.log('Connected to the Database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/question-comments', questionComments);
app.use('/api/answer-comments', answerComments);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on Port ${port}`);
});
