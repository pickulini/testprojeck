import { useEffect, useState, type FormEvent } from 'react'
import type { Task } from './types'
import { MAX_TITLE_LENGTH } from './constants'
import './Planner.css'

function Planner() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    document.documentElement.dataset.page = 'planner'
    return () => {
      delete document.documentElement.dataset.page
    }
  }, [])

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      done: false,
    }

    setTasks([...tasks, newTask])
    setTitle('')
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="desk">
      <form className="desk__form" onSubmit={addTask}>
        <input
          className="desk__input"
          type="text"
          placeholder="Задача"
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="button button__add" type="submit">Добавить</button>
      </form>

      {tasks.length === 0 && <p className="desk__empty">Задач пока нет</p>}

      <ul className="desk__list">
        {tasks.map((task) => (
          <li className="desk__item" key={task.id}>
            <span className="desk__title">{task.title}</span>
            <button className="button button__delete" onClick={() => deleteTask(task.id)}>
              удалить
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button className="button button__clear" onClick={() => setTasks([])}>
          очистить все
        </button>
      )}
    </div>
  )
}

export default Planner
