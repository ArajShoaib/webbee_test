import { literal, QueryInterface } from 'sequelize';
import { addYears, format, subYears, setMonth, setDate, setHours, } from 'date-fns';
import { ModelAttributes } from 'sequelize/types/model';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {

    await queryInterface.createTable('showrooms', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      totalSeats: { type: 'integer' },
      nonVipSeats: { type: 'integer' },
      vipSeats: { type: 'integer' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      showroomId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seatType: { type: 'bool' },
      seat: { type: 'varchar' },
      bookingAmount: { type: 'integer' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('films', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      category: { type: 'varchar' },
      details: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('schedules', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      startTime: {
        type: 'timestamp',
      },
      endTime: {
        type: 'timestamp',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('shows', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      showroomId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      filmId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'films',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      scheduleId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'schedules',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('bookings', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      showId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'showrooms',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seatId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'seats',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
