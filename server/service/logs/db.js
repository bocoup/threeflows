const { sql } = require('../../util/sqlHelpers');
const { query, withClientTransaction } = require('../../util/db');
const hash = require('object-hash');

exports.getLogs = async (queryBy, min, max, direction) => {
  let selection;

  if (queryBy === 'date') {
    selection = `
      SELECT * FROM log
      WHERE created_at >= '${min}'
      AND created_at <= '${max}'
      ORDER BY created_at ${direction.toUpperCase()}
    `;
  }

  if (queryBy === 'count') {
    selection = `
      SELECT * FROM log
      ORDER BY id ${direction.toUpperCase()}
      OFFSET ${min}
      LIMIT ${max}
    `;
  }

  const results = await query(selection);
  const seen = {};

  return results.rows.filter(row => {
    // Records without a user attached are useless.
    if (!row.capture.request.session.user) {
      return false;
    }

    const { url, session, method, query, params, body } = row.capture.request;

    const { user } = session;

    const key = hash({
      url,
      user,
      query,
      method,
      params,
      body
    });

    if (seen[key]) {
      return false;
    }

    seen[key] = true;

    return true;
  });
};

exports.addCapturedRequestAndResponse = async capture => {
  return await withClientTransaction(async client => {
    await client.query(sql`
      INSERT INTO log (capture)
      VALUES (${capture})
      ON CONFLICT DO NOTHING;
    `);
  });
};
