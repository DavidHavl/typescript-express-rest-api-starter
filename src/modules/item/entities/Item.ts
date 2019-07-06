/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import EntityInterface from '@/lib/interfaces/entities/EntityInterface'

// @Entity()
class Item implements EntityInterface {
  constructor (data?: object) {
    if (data) {
      Object.assign(this, data)
    }
  }

  // @PrimaryGeneratedColumn('uuid')
  id!: string

  // @Column()
  email!: string

  // @Column()
  createdAt!: Date

  // @Column()
  updatedAt!: Date

}

export default Item
