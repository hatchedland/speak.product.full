/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('schools', {
    school_id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    address: 'text',
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('courses', {
    course_id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    description: 'text',
    credits: 'integer',
    learning_outcomes: { type: 'TEXT[]', notNull: true },
    created_by: { type: 'varchar(255)', notNull: true },
    language: { type: 'varchar(50)', notNull: true, default: 'English' },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('parents', {
    parent_id: 'id',
    first_name: { type: 'varchar(255)', notNull: true },
    last_name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', unique: true },
    phone: 'varchar(50)',
    address: 'text',
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('students', {
    student_id: 'id',
    first_name: { type: 'varchar(255)', notNull: true },
    last_name: { type: 'varchar(255)', notNull: true },
    date_of_birth: 'date',
    gender: 'varchar(50)',
    email: { type: 'varchar(255)', unique: true },
    phone: 'varchar(50)',
    address: 'text',
    school_id: {
      type: 'integer',
      references: 'schools',
    },
    grade_level: 'varchar(50)',
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('student_parent', {
    student_id: {
      type: 'integer',
      references: 'students',
      onDelete: 'CASCADE',
    },
    parent_id: {
      type: 'integer',
      references: 'parents',
      onDelete: 'CASCADE',
    },
    relationship_type: 'varchar(100)',
    is_primary_contact: { type: 'boolean', default: false },
  });
  pgm.addConstraint('student_parent', 'student_parent_pkey', {
    primaryKey: ['student_id', 'parent_id'],
  });

  pgm.createTable('enrollments', {
    enrollment_id: 'id',
    student_id: {
      type: 'integer',
      references: 'students',
      onDelete: 'CASCADE',
    },
    course_id: {
      type: 'integer',
      references: 'courses',
      onDelete: 'CASCADE',
    },
    enrollment_date: { type: 'date', default: pgm.func('current_date') },
    grade: 'varchar(10)',
    status: 'varchar(50)',
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('enrollments', 'enrollments_student_id_course_id_unique', {
    unique: ['student_id', 'course_id'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('enrollments');
  pgm.dropTable('student_parent');
  pgm.dropTable('students');
  pgm.dropTable('parents');
  pgm.dropTable('courses');
  pgm.dropTable('schools');
};
