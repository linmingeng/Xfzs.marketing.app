import React from 'react'
import { Picker } from 'react-weui'

class CityPicker extends React.PureComponent {
    static propTypes = {
        onChange: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        data: React.PropTypes.array.isRequired,
        dataMap: React.PropTypes.object,
        selected: React.PropTypes.array,
        show: React.PropTypes.bool
    }

    static defaultProps = {
        data: [],
        dataMap: { id: 'name', items: 'sub' },
        selected: [],
        show: false
    }

    constructor(props) {
        super(props)
        const { data, selected, dataMap } = this.props
        const { groups, newselected } = this.parseData(data, dataMap.items, selected)
        this.state = {
            groups,
            selected: newselected,
            picker_show: false,
            text: ''
        }

        this.updateGroup = this.updateGroup.bind(this)
        this.parseData = this.parseData.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    parseData(data, subKey, selected = [], group = [], newselected = []) {
        let _selected = 0

        if (Array.isArray(selected) && selected.length > 0) {
            let _selectedClone = selected.slice(0)
            _selected = _selectedClone.shift()
            selected = _selectedClone
        }

        if (typeof data[_selected] === 'undefined') {
            _selected = 0
        }

        newselected.push(_selected)

        let item = data[_selected]

        var _group = JSON.parse(JSON.stringify(data))
        _group.forEach(g => delete g[subKey])
        group.push({ items: _group, mapKeys: { 'label': this.props.dataMap.id } })

        if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
            return this.parseData(item[subKey], subKey, selected, group, newselected)
        } else {
            return { groups: group, newselected }
        }
    }

    updateGroup(item, i, groupIndex, selected, picker) {
        const { data, dataMap } = this.props

        const { groups, newselected } = this.parseData(data, dataMap.items, selected)

        let text = ''
        try {
            groups.forEach((group, i) => {
                text += `${group['items'][selected[i]][this.props.dataMap.id]} `
            })
        } catch (err) {
            text = this.state.text
        }

        this.setState({
            groups,
            text,
            selected: newselected
        })

        picker.setState({
            selected: newselected
        })
    }

    handleChange() {
        if (this.props.onChange) {
            const { groups, selected } = this.state
            const selectedGroups = []

            groups.forEach((group, i) => {
                selectedGroups.push(group['items'][selected[i]])
            })

            this.props.onChange(selectedGroups)
        }
    }

    render() {
        return (
            <Picker
                lang={{ leftBtn: '关闭', rightBtn: '确定' }}
                show={this.props.show}
                onGroupChange={this.updateGroup}
                onChange={this.handleChange}
                defaultSelect={this.state.selected}
                groups={this.state.groups}
                onCancel={this.props.onCancel}
                />
        )
    }

}

export default CityPicker
