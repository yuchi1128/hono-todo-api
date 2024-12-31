import { Hono } from 'hono';
import { Bindings } from './types';

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

//1件取得
app.get('/todos/:id', async (c) => {
    const id = c.req.param('id');
	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos WHERE id = ?').bind(id).all();
		return c.json(results);
	} catch (e) {
		return c.json({ error: 'Todo not found' }, 500);
	}
});

//全件取得
app.get('/todos', async (c) => {
	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos').all();
		return c.json(results);
	} catch (e) {
		return c.json({ error: 'Todo not found' }, 500);
	}
});

export default app;
