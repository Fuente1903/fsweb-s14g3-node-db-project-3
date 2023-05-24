const db = require('../../data/db-config');

function find() {

  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc');
}

function findById(scheme_id) {

  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .select('sc.scheme_name', 'st.*')
    .orderBy('st.step_number', 'asc');
}

function findSteps(scheme_id) {

  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
    .orderBy('st.step_number', 'asc');
}

function add(scheme) {

  return db('schemes')
    .insert(scheme)
    .then(([scheme_id]) => {
      return findById(scheme_id);
    });
}

function addStep(scheme_id, step) {

  return db.transaction(async (trx) => {
    await trx('steps').insert({
      ...step,
      scheme_id: scheme_id,
    });
    const steps = await findSteps(scheme_id);
    return { scheme_id, steps };
  });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
